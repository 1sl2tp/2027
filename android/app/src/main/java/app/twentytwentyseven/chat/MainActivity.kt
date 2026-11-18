package app.twentytwentyseven.chat

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowUpward
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.view.WindowCompat
import kotlinx.coroutines.launch

// 2027-UI-V01: native Compose renderer of the Web design contract.
// No WebView, network, authentication, message transmission or customer fixtures.
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        setContent { ChatShell() }
    }
}

private data class ChatPalette(
    val bg: Color,
    val sidebar: Color,
    val soft: Color,
    val ink: Color,
    val muted: Color,
    val line: Color,
    val action: Color,
    val onAction: Color
)

@Composable
private fun palette(): ChatPalette =
    if (isSystemInDarkTheme()) ChatPalette(
        Color(0xFF161616), Color(0xFF171717), Color(0xFF292929),
        Color(0xFFF3F3F3), Color(0xFFB2B2B2), Color(0xFF3B3B3B),
        Color(0xFFF1F1F1), Color(0xFF161616)
    ) else ChatPalette(
        Color.White, Color(0xFFF9F9F9), Color(0xFFF1F1F1),
        Color(0xFF171717), Color(0xFF656565), Color(0xFFE6E6E6),
        Color(0xFF111111), Color.White
    )

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatShell() {
    val colors = palette()
    var area by rememberSaveable { mutableStateOf("chat") }
    var draft by rememberSaveable { mutableStateOf("") }
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val snackbar = remember { SnackbarHostState() }

    MaterialTheme {
        ModalNavigationDrawer(
            drawerState = drawerState,
            drawerContent = {
                ModalDrawerSheet(drawerContainerColor = colors.sidebar) {
                    Text("2027", modifier = Modifier.padding(22.dp), fontSize = 18.sp, fontWeight = FontWeight.SemiBold, color = colors.ink)
                    listOf("chat" to "Trò chuyện", "work" to "Công việc").forEach { (id, label) ->
                        NavigationDrawerItem(
                            label = { Text(label) },
                            selected = area == id,
                            onClick = { area = id; scope.launch { drawerState.close() } },
                            modifier = Modifier.padding(horizontal = 10.dp),
                            colors = NavigationDrawerItemDefaults.colors(
                                selectedContainerColor = colors.soft,
                                selectedTextColor = colors.ink,
                                unselectedTextColor = colors.ink
                            )
                        )
                    }
                    Spacer(Modifier.height(16.dp))
                    Text("Chưa kết nối dữ liệu", modifier = Modifier.padding(22.dp), color = colors.muted, fontSize = 13.sp)
                }
            }
        ) {
            Scaffold(
                containerColor = colors.bg,
                contentWindowInsets = WindowInsets(0, 0, 0, 0),
                snackbarHost = { SnackbarHost(snackbar) },
                topBar = {
                    Row(
                        modifier = Modifier.fillMaxWidth().height(56.dp)
                            .border(width = 0.5.dp, color = colors.line)
                            .padding(horizontal = 8.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        IconButton(onClick = { scope.launch { drawerState.open() } }, modifier = Modifier.size(44.dp)) {
                            Icon(Icons.Default.Menu, contentDescription = "Mở menu", tint = colors.ink)
                        }
                        Row(
                            modifier = Modifier
                                .border(1.dp, colors.line, RoundedCornerShape(50))
                                .padding(3.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            listOf("chat" to "Trò chuyện", "work" to "Công việc").forEach { (id, label) ->
                                val selected = area == id
                                Box(
                                    modifier = Modifier
                                        .background(if (selected) colors.soft else Color.Transparent, RoundedCornerShape(50))
                                        .clickable { area = id }
                                        .heightIn(min = 40.dp)
                                        .padding(horizontal = 10.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(label, color = if (selected) colors.ink else colors.muted, fontSize = 13.sp,
                                        fontWeight = if (selected) FontWeight.SemiBold else FontWeight.Medium)
                                }
                            }
                        }
                        IconButton(onClick = { scope.launch { snackbar.showSnackbar("Chưa có dữ liệu để tìm kiếm.") } }, modifier = Modifier.size(44.dp)) {
                            Icon(Icons.Default.Search, contentDescription = "Tìm kiếm", tint = colors.ink)
                        }
                    }
                }
            ) { insets ->
                Column(
                    modifier = Modifier.fillMaxSize().padding(insets)
                        .imePadding().navigationBarsPadding()
                ) {
                    Box(modifier = Modifier.weight(1f).fillMaxWidth(), contentAlignment = Alignment.Center) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.padding(24.dp)) {
                            Text(if (area == "chat") "Trò chuyện" else "Công việc",
                                color = colors.ink, fontSize = 18.sp, fontWeight = FontWeight.SemiBold)
                            Spacer(Modifier.height(6.dp))
                            Text(if (area == "chat") "Chưa có hội thoại. Bố cục sẵn sàng để kết nối dữ liệu."
                                 else "Vùng nghiệp vụ chưa kết nối. Không hiển thị dữ liệu giả.",
                                color = colors.muted, fontSize = 14.sp, lineHeight = 22.sp, textAlign = TextAlign.Center)
                        }
                    }
                    if (area == "chat") {
                        ChatComposer(
                            text = draft, onTextChange = { draft = it }, colors = colors,
                            onSendAttempt = {
                                scope.launch { snackbar.showSnackbar("Đây là bản dựng khung: tin nhắn chưa được gửi.") }
                            }
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun ChatComposer(
    text: String,
    onTextChange: (String) -> Unit,
    colors: ChatPalette,
    onSendAttempt: () -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth().padding(horizontal = 10.dp, vertical = 6.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth().heightIn(min = 56.dp)
                .border(1.dp, colors.line, RoundedCornerShape(28.dp))
                .background(colors.bg, RoundedCornerShape(28.dp))
                .padding(horizontal = 5.dp, vertical = 4.dp),
            verticalAlignment = Alignment.Bottom
        ) {
            IconButton(onClick = {}, enabled = false, modifier = Modifier.size(44.dp)) {
                Icon(Icons.Default.Add, contentDescription = "Đính kèm — chưa kết nối", tint = colors.muted)
            }
            BasicTextField(
                value = text,
                onValueChange = onTextChange,
                textStyle = TextStyle(color = colors.ink, fontSize = 16.sp, lineHeight = 24.sp),
                maxLines = 6,
                modifier = Modifier.weight(1f).heightIn(min = 44.dp, max = 160.dp).padding(horizontal = 4.dp, vertical = 10.dp),
                decorationBox = { inner ->
                    Box {
                        if (text.isEmpty()) Text("Nhắn tin", color = colors.muted, fontSize = 16.sp)
                        inner()
                    }
                }
            )
            IconButton(onClick = {}, enabled = false, modifier = Modifier.size(44.dp)) {
                Icon(Icons.Default.Mic, contentDescription = "Ghi âm — chưa kết nối", tint = colors.muted)
            }
            IconButton(onClick = onSendAttempt, enabled = text.isNotBlank(), modifier = Modifier.size(44.dp)
                .background(if (text.isNotBlank()) colors.action else colors.soft, CircleShape)) {
                Icon(Icons.Default.ArrowUpward, contentDescription = "Gửi", tint = if (text.isNotBlank()) colors.onAction else colors.muted)
            }
        }
        Text("2027 · UI-V01", modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
            textAlign = TextAlign.Center, fontSize = 10.sp, color = colors.muted)
    }
}
